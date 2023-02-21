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
import { DuoMatch } from '../../components/DuoMatch';
import axios from 'axios';

export function Game() {
  const route = useRoute();
  const game: GameParams = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    axios.get(`http://192.168.0.3:3000/ads/${adsId}/discord`)
      .then(response => {
        return setDiscordDuoSelected(response.data.discord)
      })
  }

  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

  useEffect(() => {
    axios.get(`http://192.168.0.3:3000/games/${game.id}/ads`)
      .then(response => setAds(response.data))
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
          <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
        )}
          horizontal contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>Não há anúncios publicados ainda.</Text>
          )}
        />

        <DuoMatch onClose={() => setDiscordDuoSelected('')} visible={discordDuoSelected.length > 0} discord={discordDuoSelected} />
      </SafeAreaView>
    </Background>
  );
}