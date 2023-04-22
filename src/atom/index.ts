import {atom} from 'jotai';
import {Task} from '../types/task.type';

export const TaskListAtom = atom<Array<Task>>([]);
