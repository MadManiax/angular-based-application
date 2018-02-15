using System;
using System.IO;
using System.Runtime.Serialization.Json;
using System.Text;

namespace CacheManifestTool.Serialization
{
    public static class JSonSerializationExtensions
    {

        public static TType DeserializeFromFile<TType>(this string filename) where TType : class
        {
            if (string.IsNullOrEmpty(filename))
                throw new ArgumentException("Value cannot be null or empty.", nameof(filename));

            using (var sr = new StreamReader(filename))
            {
                return sr.ReadToEnd().Deserialize<TType>();
            }
        }

        public static TType Deserialize<TType>(this string json) where TType:class 
        {
            if (string.IsNullOrEmpty(json))
                return null;

            using (var ms = new MemoryStream(Encoding.Unicode.GetBytes(json)))
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(TType));
                return serializer.ReadObject(ms) as TType;
            }

        }
    }
}