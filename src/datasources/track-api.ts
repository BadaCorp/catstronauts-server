import { RESTDataSource } from "apollo-datasource-rest";
import { Author, Module, Track } from "../types/types";

class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://odyssey-lift-off-rest-api.herokuapp.com/";
  }

  getTracksForHome = async (): Promise<Track[]> => {
    return this.get("tracks");
  };

  getAuthor = async (authorId: string): Promise<Author> => {
    return this.get(`author/${authorId}`);
  };

  getTrack = async (trackId: string): Promise<Track> => {
    return this.get(`track/${trackId}`);
  };

  getTrackModules = async (trackId: string): Promise<Module[]> => {
    return this.get(`track/${trackId}/modules`);
  };
}

export default TrackAPI;
