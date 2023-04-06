SELECT * FROM Guilds
    INNER JOIN (Players) ON (Players.guildId = Guilds.id);
