using System;
using System.Runtime.Serialization;

namespace CacheManifestTool.Configuration
{
    [DataContract]
    public class PathInfo
    {

        public PathInfo()
        {
            this.Exclude = false;
        }

        [DataMember(Name = "path")]
        public string Path { get; set; }

        [DataMember(Name = "type")]
        public string TypeString { get; set; }

        public PathType Type
        {
            get
            {
                PathType type = PathType.File;
                Enum.TryParse(this.TypeString, out type);
                return type;
            }

            set => this.TypeString = value.ToString();
        }

        [DataMember(Name = "exclude",IsRequired = false)]
        public bool Exclude { get; set; }
    }
}