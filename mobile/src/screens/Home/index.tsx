import { View, Image, FlatList } from 'react-native';
import { styles } from './styles';
import logoImage from '../../assets/logo-nlw-esports.png';
import { Head } from '../../components/Head';
import { GameCard } from '../../components/GameCard';
import { GAMES } from '../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <Head title='Encontre seu duo!' subtitle='Selecione o game que deseja jogar...' />

      <FlatList horizontal data={GAMES} keyExtractor={item => item.id} renderItem={({ item }) => (
        <GameCard data={item} />
      )} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentList} />
    </View>
  );
}