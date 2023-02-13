import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import logoImage from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { GameParams } from '../../@types/@navigation';
import { THEME } from '../../theme';
import { Head } from '../../components/Head';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Game() {
  const route = useRoute();
  const game: GameParams = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  const [ads, setAds] = useState<DuoCardProps[]>([]);

  useEffect(() => {
    fetch(`http://192.168.0.2:3000/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImage} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Head title={game.title} subtitle="Conecte-se e comece a jogar!"></Head>

        <FlatList data={ads} keyExtractor={item => item.id} renderItem={({ item }) => (
          <DuoCard data={item} onConnect={() => {}} />
        )}
          horizontal contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}