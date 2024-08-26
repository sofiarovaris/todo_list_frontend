import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SectionTitleWithAction from '../../components/SectionTitleWithAction';
import ListComponent from '../../features/todo/components/List';
import useListFetch from '../../features/todo/hooks/useListFetch';

export default function HomeView() {
  const { lists } = useListFetch();

  const numColumns = useBreakpointValue({ base: 1, md: 2, lg: 3, xl: 4 });

  return (
    <Grid
      templateRows="auto 1fr auto"
      minH="100vh"
      bg="#F7FAFC"
      templateColumns="1fr"
    >
      <Box>
        <Header />
      </Box>
      <Box overflowY="auto" p={4} display="flex" flexDirection="column" gap={4}>
        <SectionTitleWithAction />
        <Box flex="1" overflowY="auto">
          <Grid templateColumns={`repeat(${numColumns}, 1fr)`} gap={4}>
            {lists.map((list, index) => (
              <ListComponent key={index} list={list} />
            ))}
          </Grid>
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Grid>
  );
}
