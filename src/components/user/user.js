import { asyncForEach } from "../../utils";

export const cleanUpUser = async (db, userId) => {
  await removeCurrentlyPlayingGames(db, userId);
};

export const hasGamesInProgress = async (db, userId) => {
  const playerSnapshot = await db
    .collectionGroup('players')
    .where('userId', '==', userId)
    .get();

  let hasGames = false;
  await asyncForEach(playerSnapshot, async (player) => {
    const game = await player.ref.parent.parent.get();
    hasGames = hasGames || game.data().state != 'finished';
  });
  return hasGames;
};

export const removeCurrentlyPlayingGames = async (db, userId) => {
  let results = {
    errors: [],
    mistakes: [],
    failures: [],
  };

  const gameSnapshot = await db
    .collection('games')
    .where('state', '!=', 'finished')
    .get();

  await asyncForEach(gameSnapshot, async (game) => {
    const playerSnapshot = await game.ref
      .collection('players')
      .where('userId', '==', userId)
      .get();
  
    await asyncForEach(playerSnapshot, async (player) => {
      await player.ref.delete();
    });
  });
  return results;
};
