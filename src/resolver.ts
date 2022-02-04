import { Author, Module, Root, Track } from "./types/types";

interface TrackSchema
  extends Omit<Track, "modules" | "authorId" | "topic" | "createAt"> {
  author: Author;
  modules: Module[];
}

interface TrackSchemaOnUpdate {
  code: number;
  success: boolean;
  message: string;
  track: TrackSchema | null;
}

interface AuthorSchema extends Author {}

interface ModuleSchema
  extends Omit<
    Module,
    "trackId" | "authorId" | "topic" | "content" | "videoUrl"
  > {}

const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: async (
      _: Root,
      __: Root,
      { dataSources }: any
    ): Promise<TrackSchema[]> => {
      return await dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by id, for the Track page
    track: async (
      _: Root,
      { id }: Track,
      { dataSources }: any
    ): Promise<TrackSchema> => {
      return await dataSources.trackAPI.getTrack(id);
    },
  },
  Mutation: {
    incrementTrackViews: async (
      _: Root,
      { id }: Track,
      { dataSources }: any
    ): Promise<TrackSchemaOnUpdate> => {
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track,
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: `${err.extensions.response.body.slice(0, -1)} - (${id}).`,
          track: null,
        };
      }
    },
  },

  Track: {
    author: async (
      { authorId }: Track,
      _: Root,
      { dataSources }: any
    ): Promise<AuthorSchema> => {
      return await dataSources.trackAPI.getAuthor(authorId);
    },
    modules: async (
      { id }: Track,
      _: Root,
      { dataSources }: any
    ): Promise<ModuleSchema[]> => {
      return await dataSources.trackAPI.getTrackModules(id);
    },
    durationInSeconds: async ({ length }: Track): Promise<Track["length"]> => {
      return length;
    },
  },

  Module: {
    durationInSeconds: async ({ length }: Track): Promise<Module["length"]> => {
      return length;
    },
  },
};

export default resolvers;
