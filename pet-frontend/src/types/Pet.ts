export interface Stack {
  stackName: string;
  studyPoints: number;
}

export interface Pet {
  id: number;
  name: string;
  developerType: 'FRONTEND' | 'BACKEND';
  habitatType: string;
  accessoryType: string;
  knowledge: number;
  levelKnowledge: number;
  happiness: number;
  energy: number;
  stacks?: Stack[];
  ownerUsername: string;
}
