import { Box, Grid, Stack, useBreakpointValue } from '@chakra-ui/react';
import Header from '../../core/components/Header';
import Footer from '../../core/components/Footer';
import SectionTitleWithAction from '../../core/components/SectionTitleWithAction';
import ListComponent from '../../features/list/components/List';

const lists = [
  {
    title: 'Lista de Compras',
    items: [
      { text: 'Maçã', isChecked: false, onToggle: () => {} },
      { text: 'Banana', isChecked: true, onToggle: () => {} },
      { text: 'Pera', isChecked: false, onToggle: () => {} },
      { text: 'Uva', isChecked: true, onToggle: () => {} },
    ],
    onAddItem: (itemText: string) => console.log(`Adicionado: ${itemText}`),
    onEdit: () => console.log('Editou Lista de Compras'),
    onDelete: () => console.log('Deletou Lista de Compras'),
  },
  {
    title: 'Lista de Tarefas',
    items: [
      { text: 'Estudar React', isChecked: false, onToggle: () => {} },
      { text: 'Fazer Exercícios', isChecked: true, onToggle: () => {} },
      { text: 'Ler Livro', isChecked: false, onToggle: () => {} },
    ],
    onAddItem: (itemText: string) => console.log(`Adicionado: ${itemText}`),
    onEdit: () => console.log('Editou Lista de Tarefas'),
    onDelete: () => console.log('Deletou Lista de Tarefas'),
  },
  {
    title: 'Lista de Tarefas',
    items: [
      { text: 'Estudar React', isChecked: false, onToggle: () => {} },
      { text: 'Fazer Exercícios', isChecked: true, onToggle: () => {} },
      { text: 'Ler Livro', isChecked: false, onToggle: () => {} },
    ],
    onAddItem: (itemText: string) => console.log(`Adicionado: ${itemText}`),
    onEdit: () => console.log('Editou Lista de Tarefas'),
    onDelete: () => console.log('Deletou Lista de Tarefas'),
  },
  {
    title: 'Lista de Tarefas',
    items: [
      { text: 'Estudar React', isChecked: false, onToggle: () => {} },
      { text: 'Fazer Exercícios', isChecked: true, onToggle: () => {} },
      { text: 'Ler Livro', isChecked: false, onToggle: () => {} },
    ],
    onAddItem: (itemText: string) => console.log(`Adicionado: ${itemText}`),
    onEdit: () => console.log('Editou Lista de Tarefas'),
    onDelete: () => console.log('Deletou Lista de Tarefas'),
  },
  // Adicione mais listas conforme necessário
];

export default function HomeView() {
  // Define o número de colunas com base no tamanho da tela
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
              <ListComponent
                key={index}
                title={list.title}
                items={list.items}
                onAddItem={list.onAddItem}
                onEdit={list.onEdit}
                onDelete={list.onDelete}
              />
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
