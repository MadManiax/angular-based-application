using System.Collections.Generic;
using System.Runtime.Serialization;

namespace CacheManifestTool.Configuration
{
    [DataContract]
    public class ManifestConfiguration
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "path")]
        public string Path { get; set; }

        [DataMember(Name = "version")]
        public string Version { get; set; }

        [DataMember(Name = "cache")]
        public List<PathInfo> Cache { get; set; }
        [DataMember(Name = "network")]
        public List<PathInfo> Network { get; set; }
        [DataMember(Name = "fallback")]
        public List<PathInfo> Fallback { get; set; }
    }
}