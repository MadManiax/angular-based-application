using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using CacheManifestTool.Configuration;

namespace CacheManifestTool
{
    public class ManifestBuilder
    {
        private ManifestConfiguration _configuration;
        private string _manifest;
        private static string BasePath;

        public ManifestBuilder(ManifestConfiguration configuration)
        {
            _configuration = configuration;
            BasePath = _configuration.Path;
        }


        private void BuildHeader(StringBuilder builder)
        {
            builder.AppendLine("CACHE MANIFEST");
            builder.AppendLine("#Version = V" + _configuration.Version + " " + DateTime.Now.ToString("yyyyMMdd-HHmm"));
        }

        private IEnumerable<string> BuildElements(IEnumerable<PathInfo> items)
        {
            if (items == null || !items.Any())
            {
                return new List<string>();
            }
            var basePath = AppDomain.CurrentDomain.BaseDirectory;
            var excludes = items.Where(item => item.Exclude).ToList();
            var fileExcludes = GetAllFilePaths(excludes.Where(item => item.Type == PathType.Folder).Select(item => item.Path), basePath).ToList();
            fileExcludes.AddRange(
                excludes
                    .Where(item => item.Type == PathType.File)
                    .Select(item => item.Path.Replace('\\', '/'))
                    .Where(item => !fileExcludes.Contains(item)));

            var paths = items.Where(item => item.Type == PathType.Folder && !item.Exclude).Select(x => x.Path);
            var fileIncludes = GetAllFilePaths(paths, basePath).ToList();

            var files = items.Where(item => item.Type == PathType.File && !item.Exclude).Select(x => x.Path.Replace('\\', '/'));
            fileIncludes.AddRange(files.Where(item => !fileIncludes.Contains(item)));

            return fileIncludes.Where(item => !fileExcludes.Contains(item));
        }

        public IEnumerable<string> GetAllFilePaths(IEnumerable<string> paths, string basePath)
        {
            var filenames = new List<string>();

            foreach (var path in paths)
            {
                var di = new DirectoryInfo(Path.Combine(BasePath, path));
                if (!di.Exists)
                {
                    continue;
                }

                var dirFiles = di.GetFiles("*.*", SearchOption.AllDirectories);

                filenames.AddRange(
                    dirFiles
                        .Select(fileInfo => fileInfo.FullName?
                            .Replace(BasePath, string.Empty)?
                            .Replace('\\', '/'))
                        .Where(item => !filenames.Contains(item)));
            }

            return filenames;
        }

        private void BuildCache(StringBuilder builder)
        {
            var relativePaths = BuildElements(_configuration.Cache);
            builder.AppendLine();
            foreach (var relativePath in relativePaths)
            {
                builder.AppendLine(relativePath);
            }
        }

        private void BuildNetwork(StringBuilder builder)
        {
            builder.AppendLine();
            builder.AppendLine("NETWORK:");

            if (!_configuration.Network.Any())
            {
                builder.AppendLine("*");
                return;
            }

            var files = BuildElements(_configuration.Network);
            foreach (var file in files)
            {
                builder.AppendLine(file);
            }
        }

        private void BuildFallback(StringBuilder builder)
        {
            builder.AppendLine();
            builder.AppendLine("FALLBACK:");
            
            var files = BuildElements(_configuration.Fallback);
            foreach (var file in files)
            {
                builder.AppendLine(file);
            }
        }

        public void Build()
        {
            var builder = new StringBuilder();
            BuildHeader(builder);
            BuildCache(builder);
            BuildNetwork(builder);
            BuildFallback(builder);

            _manifest = builder.ToString();
        }


        public void Save()
        {
            if (string.IsNullOrEmpty(_manifest))
            {
                throw new Exception("The manifest is not built");
            }
            
            var filename = Path.Combine(BasePath, _configuration.Name);
            using (var sw = new StreamWriter(filename,false))
            {
                sw.Write(_manifest);
            }
        }
    }
}