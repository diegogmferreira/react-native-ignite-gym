import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from "native-base";
import { useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const PHOTO_SIZE = 33;

export function Profile() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState('https://github.com/diegogmferreira.png');

  const toast = useToast();

  async function handlePhotoSelect() {
    try {
      setIsPhotoLoading(true)
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.75,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false
      });

      if (canceled) return;

      if (!!assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(assets[0].uri, { size: true });;

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024 > 5 )) {
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma imagem menor que 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          });
        }

        setUserPhoto(assets[0].uri);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsPhotoLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 56 }}>
        <Center
          mt={6}
          px={10}
        >
          {isPhotoLoading
            ? <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor='gray.500'
              endColor='gray.400'
            />
            : <UserPhoto
              source={{
                uri: userPhoto
              }}
              alt="Foto de perfil"
              size={PHOTO_SIZE}
            />
          }

          <TouchableOpacity onPress={handlePhotoSelect}>
            <Text
              color='gray.500'
              fontWeight='bold'
              fontSize='md'
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder="Nome"
            bg='gray.600'
          />
          <Input
            // value={'di.galvao89@gmail.com'}
            placeholder="E-mail"
            bg='gray.600'
            isDisabled
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color='gray.200' fontSize='md' mb={2} fontFamily='heading'>
            Alterar senha
          </Heading>

          <Input
            bg='gray.600'
            placeholder="Senha antiga"
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder="Nova senha"
            secureTextEntry
          />
          <Input
            bg='gray.600'
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}