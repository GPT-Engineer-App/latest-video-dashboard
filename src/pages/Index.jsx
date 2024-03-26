import { useState, useEffect } from "react";
import { Box, Heading, VStack, SimpleGrid, Image, Text, Link, Spinner } from "@chakra-ui/react";

const CHANNELS = [
  { id: "VivaLaDirtLeague", name: "Viva La Dirt League" },
  { id: "CGPGrey", name: "CGP Grey" },
  { id: "IamMoBo", name: "I am MoBo" },
  { id: "MrBeast", name: "MrBeast" },
  { id: "MrBeast2", name: "MrBeast 2" },
  { id: "BeastReacts", name: "Beast Reacts" },
  { id: "MrBeastGaming", name: "MrBeast Gaming" },
];

const YOUTUBE_API_KEY = "YOUR_VALID_API_KEY_HERE";

const Index = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoData = await Promise.all(
        CHANNELS.map(async (channel) => {
          const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${channel.id}&part=snippet,id&order=date&maxResults=1`);
          const data = await res.json();
          return {
            id: data.items[0].id.videoId,
            title: data.items[0].snippet.title,
            thumbnail: data.items[0].snippet.thumbnails.medium.url,
            channelName: channel.name,
          };
        }),
      );
      setVideos(videoData);
      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" mb={8}>
        YouTube Dashboard
      </Heading>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {videos.map((video) => (
            <Link href={`https://www.youtube.com/watch?v=${video.id}`} key={video.id} isExternal>
              <VStack align="stretch" spacing={4}>
                <Image src={video.thumbnail} alt={video.title} />
                <Heading as="h2" size="md">
                  {video.title}
                </Heading>
                <Text>{video.channelName}</Text>
              </VStack>
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Index;
