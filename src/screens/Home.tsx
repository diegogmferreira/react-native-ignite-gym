import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { Center, FlatList, HStack, Heading, Text, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState(['costas', 'biceps', 'triceps', 'ombro']);
  const [exercisesData, setExercisesData] = useState([
    { title: 'Biceps Chest Press', details: '3x5' },
    { title: 'Biceps Chest Press 2', details: '3x5' },
    { title: 'Biceps Chest Press 3', details: '3x5' },
  ])
  const [selectedGroup, setSelectedGroup] = useState('costas');

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color="gray.200" fontSize='md'>Exercícios</Heading>
          <Text color="gray.200" fontSize='sm'>{exercisesData.length}</Text>
        </HStack>

        <FlatList
          data={exercisesData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <ExerciseCard
              headingText={item.title}
              details={item.details}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}