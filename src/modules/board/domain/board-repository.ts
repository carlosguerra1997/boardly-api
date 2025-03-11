import { ListRepository } from "@/common/domain/identity/list-repository";

import { Board } from '@/modules/board/domain/board'

export interface BoardRepository extends ListRepository<Board> {}

export const BoardRepository = Symbol('BoardRepository')