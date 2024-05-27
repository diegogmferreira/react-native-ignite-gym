import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  headingText: string;
  details: string;
}

export function ExerciseCard({ headingText, details, ...rest }: Props) {

  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
        <Image
          source={{
            uri: 'https://source.unsplash.com/random/?gym',
          }}
          alt='Imagem do exercício'
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading
            fontSize='lg'
            color='white'
            fontFamily='heading'
          >
            {headingText}
          </Heading>
          <Text
            fontSize='sm'
            color='gray.200'
            mt={1}
            numberOfLines={2}
          >
            {details}
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color='gray.300'
        />
      </HStack>
    </TouchableOpacity>
  )
}