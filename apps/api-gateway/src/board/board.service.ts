import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE } from 'shared/constants/message-pattern';
import {
  CreateParticipantDto,
  CreateBoardDto,
  UpdateBoardDto,
  UpdateParticipantDto,
} from './dto/req.dto';

@Injectable()
export class BoardService {
  public constructor(@Inject('BOARD_SERVICE') private readonly boardClient: ClientProxy) {}

  public async getPostsByPostCategoryId(postCategoryId: number) {
    return await this.boardClient.send(MESSAGE.POST.GET_ALL_POST_BY_POST_CATEGORY_ID, {
      postCategoryId,
    });
  }

  public async getPostById(id: number) {
    return await this.boardClient.send(MESSAGE.POST.GET_ONE_POST, { id });
  }

  public async createPost(payload: { postCategoryId: number; createBoardDto: CreateBoardDto }) {
    return await this.boardClient.send(MESSAGE.POST.CREATE_POST, payload);
  }

  public async updatePost(payload: { id: number; updateBoardDto: UpdateBoardDto }) {
    return await this.boardClient.send(MESSAGE.POST.UPDATE_POST, payload);
  }

  public async deletePost(id: number) {
    return await this.boardClient.send(MESSAGE.POST.DELETE_POST, { id });
  }

  public async createParticipant(payload: {
    postId: number;
    createParticipantDto: CreateParticipantDto;
  }) {
    return await this.boardClient.send(MESSAGE.PARTICIPANT.CREATE_PARTICIPANT, payload);
  }

  public async updateParticipantStatus(payload: {
    postId: number;
    updateParticipantDto: UpdateParticipantDto;
  }) {
    return await this.boardClient.send(MESSAGE.PARTICIPANT.UPDATE_PARTICIPANT_STATUS, payload);
  }

  public async getApplyByParticipnat(postId: number) {
    return await this.boardClient.send(MESSAGE.PARTICIPANT.GET_PARTICIPANTS_BY_POST, { postId });
  }

  public async createBookmark({ userId, postId }: { userId: number; postId: number }) {
    return await this.boardClient.send(MESSAGE.POST.CREATE_BOOKMARK, { userId, postId });
  }

  public async deleteBookmark({ userId, postId }: { userId: number; postId: number }) {
    return await this.boardClient.send(MESSAGE.POST.DELETE_BOOKMARK, { userId, postId });
  }

  public async getBookmarksByUserEmail(email: string) {
    return await this.boardClient.send(MESSAGE.POST.GET_BOOKMARKS_BY_EMAIL, { email });
  }
}
