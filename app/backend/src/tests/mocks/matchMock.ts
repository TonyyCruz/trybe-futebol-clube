export const matchesFinished = [
  {
		"id": 1,
		"homeTeam": 1,
		"homeTeamGoals": 5,
		"awayTeam": 6,
		"awayTeamGoals": 1,
		"inProgress": false,
	},
	{
		"id": 2,
		"homeTeam": 2,
		"homeTeamGoals": 1,
		"awayTeam": 5,
		"awayTeamGoals": 1,
		"inProgress": false,
	},
  {
		"id": 3,
		"homeTeam": 3,
		"homeTeamGoals": 3,
		"awayTeam": 4,
		"awayTeamGoals": 0,
		"inProgress": false,
	},
  {
		"id": 4,
		"homeTeam": 4,
		"homeTeamGoals": 0,
		"awayTeam": 3,
		"awayTeamGoals": 4,
		"inProgress": false,
	},
	{
		"id": 5,
		"homeTeam": 5,
		"homeTeamGoals": 1,
		"awayTeam": 2,
		"awayTeamGoals": 4,
		"inProgress": false,
	},
	{
		"id": 6,
		"homeTeam": 6,
		"homeTeamGoals": 5,
		"awayTeam": 1,
		"awayTeamGoals": 1,
		"inProgress": false,
  },
];

export const matchesInProgress = [
  {
    "id": 7,
    "homeTeam": 6,
    "homeTeamGoals": 0,
    "awayTeam": 5,
    "awayTeamGoals": 0,
    "inProgress": true,
  },
  {
    "id": 8,
    "homeTeam": 1,
    "homeTeamGoals": 1,
    "awayTeam": 2,
    "awayTeamGoals": 0,
    "inProgress": true,
  }
];

export default [...matchesFinished, ...matchesInProgress];
