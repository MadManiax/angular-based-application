using System;
using System.IO;
using System.Reflection;
using System.Resources;
using CacheManifestTool.Configuration;
using CacheManifestTool.Serialization;

namespace CacheManifestTool
{
    class Program
    {
        static string GetConfigJSon()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceStream = assembly.GetManifestResourceStream("CacheManifestTool.config.json");
            if (resourceStream == null)
            {
                throw new MissingManifestResourceException();
            }

            using (var sr = new StreamReader(resourceStream))
            {
                return sr.ReadToEnd();
            }
        }

        static void Main(string[] args)
        {
            var configJson = GetConfigJSon();
            try
            {
                var configuration = configJson.Deserialize<ManifestConfiguration>();
                if (configuration == null)
                {
                    Console.WriteLine("Configuration not serialized");
                }
                else
                {
                    Console.WriteLine("Version = " + configuration.Version);
                    ManifestBuilder builder = new ManifestBuilder(configuration);
                    builder.Build();
                    builder.Save(); 
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                
            }

            Console.ReadKey();

        }
    }
}
