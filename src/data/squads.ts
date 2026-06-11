export interface Player {
  number: number;
  name: string;
  position: "Goleiro" | "Defensor" | "Meio-campista" | "Atacante";
  club: string;
  age?: number;
  goals?: number;
  assists?: number;
  saves?: number;
  dribblesCompleted?: number;
}

export interface Squad {
  teamCode: string;
  coach: string;
  players: Player[];
}

export const squads: Record<string, Squad> = {
  BRA: {
    teamCode: "BRA",
    coach: "Carlo Ancelotti",
    players: [
      // Goleiros
      { number: 1,  name: "Alisson",          position: "Goleiro",       club: "Liverpool",          goals: 0, assists: 0, saves: 0 },
      { number: 12, name: "Weverton",          position: "Goleiro",       club: "Grêmio",             goals: 0, assists: 0, saves: 0 },
      { number: 23, name: "Ederson",           position: "Goleiro",       club: "Fenerbahçe",         goals: 0, assists: 0, saves: 0 },
      // Defensores
      { number: 2,  name: "Wesley",            position: "Defensor",      club: "Roma",               goals: 0, assists: 0 },
      { number: 3,  name: "Gabriel Magalhães", position: "Defensor",      club: "Arsenal",            goals: 0, assists: 0 },
      { number: 4,  name: "Marquinhos",        position: "Defensor",      club: "PSG",                goals: 0, assists: 0 },
      { number: 6,  name: "Alex Sandro",       position: "Defensor",      club: "Flamengo",           goals: 0, assists: 0 },
      { number: 13, name: "Danilo",            position: "Defensor",      club: "Flamengo",           goals: 0, assists: 0 },
      { number: 14, name: "Bremer",            position: "Defensor",      club: "Juventus",           goals: 0, assists: 0 },
      { number: 15, name: "Léo Pereira",       position: "Defensor",      club: "Flamengo",           goals: 0, assists: 0 },
      { number: 16, name: "Douglas Santos",    position: "Defensor",      club: "Zenit",              goals: 0, assists: 0 },
      { number: 24, name: "Ibañez",            position: "Defensor",      club: "Al Ahli",            goals: 0, assists: 0 },
      // Meio-campistas
      { number: 5,  name: "Casemiro",          position: "Meio-campista", club: "Manchester United",  goals: 0, assists: 0 },
      { number: 8,  name: "Bruno Guimarães",   position: "Meio-campista", club: "Newcastle",          goals: 0, assists: 0 },
      { number: 17, name: "Fabinho",           position: "Meio-campista", club: "Al-Ittihad",         goals: 0, assists: 0 },
      { number: 18, name: "Danilo Santos",     position: "Meio-campista", club: "Botafogo",           goals: 0, assists: 0 },
      { number: 20, name: "Lucas Paquetá",     position: "Meio-campista", club: "Flamengo",           goals: 0, assists: 0 },
      { number: 10, name: "Neymar",            position: "Meio-campista", club: "Santos",             goals: 0, assists: 0 },
      { number: 11, name: "Raphinha",          position: "Meio-campista", club: "Barcelona",          goals: 0, assists: 0 },
      // Atacantes
      { number: 7,  name: "Vinicius Jr.",      position: "Atacante",      club: "Real Madrid",        goals: 0, assists: 0, dribblesCompleted: 0 },
      { number: 9,  name: "Matheus Cunha",     position: "Atacante",      club: "Wolverhampton",      goals: 0, assists: 0, dribblesCompleted: 0 },
      { number: 19, name: "Endrick",           position: "Atacante",      club: "Real Madrid",        goals: 0, assists: 0, dribblesCompleted: 0 },
      { number: 21, name: "Luiz Henrique",     position: "Atacante",      club: "Zenit",              goals: 0, assists: 0, dribblesCompleted: 0 },
      { number: 22, name: "Gabriel Martinelli",position: "Atacante",      club: "Arsenal",            goals: 0, assists: 0, dribblesCompleted: 0 },
      { number: 25, name: "Igor Thiago",       position: "Atacante",      club: "Club Brugge",        goals: 0, assists: 0, dribblesCompleted: 0 },
      { number: 26, name: "Rayan",             position: "Atacante",      club: "Flamengo",           goals: 0, assists: 0, dribblesCompleted: 0 },
    ],
  },
};