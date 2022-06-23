/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/playlists": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.playlists.id"];
          created_at?: parameters["rowFilter.playlists.created_at"];
          uid?: parameters["rowFilter.playlists.uid"];
          name?: parameters["rowFilter.playlists.name"];
          songs?: parameters["rowFilter.playlists.songs"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["playlists"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** playlists */
          playlists?: definitions["playlists"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.playlists.id"];
          created_at?: parameters["rowFilter.playlists.created_at"];
          uid?: parameters["rowFilter.playlists.uid"];
          name?: parameters["rowFilter.playlists.name"];
          songs?: parameters["rowFilter.playlists.songs"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.playlists.id"];
          created_at?: parameters["rowFilter.playlists.created_at"];
          uid?: parameters["rowFilter.playlists.uid"];
          name?: parameters["rowFilter.playlists.name"];
          songs?: parameters["rowFilter.playlists.songs"];
        };
        body: {
          /** playlists */
          playlists?: definitions["playlists"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/users": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.users.created_at"];
          uid?: parameters["rowFilter.users.uid"];
          counts?: parameters["rowFilter.users.counts"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["users"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** users */
          users?: definitions["users"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.users.created_at"];
          uid?: parameters["rowFilter.users.uid"];
          counts?: parameters["rowFilter.users.counts"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.users.created_at"];
          uid?: parameters["rowFilter.users.uid"];
          counts?: parameters["rowFilter.users.counts"];
        };
        body: {
          /** users */
          users?: definitions["users"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/ratios": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ratios.id"];
          created_at?: parameters["rowFilter.ratios.created_at"];
          text?: parameters["rowFilter.ratios.text"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["ratios"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** ratios */
          ratios?: definitions["ratios"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ratios.id"];
          created_at?: parameters["rowFilter.ratios.created_at"];
          text?: parameters["rowFilter.ratios.text"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ratios.id"];
          created_at?: parameters["rowFilter.ratios.created_at"];
          text?: parameters["rowFilter.ratios.text"];
        };
        body: {
          /** ratios */
          ratios?: definitions["ratios"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/get_random_ratios": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: smallint */
            n: number;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  playlists: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /** Format: text */
    uid: string;
    /** Format: text */
    name: string;
    /** Format: jsonb */
    songs: unknown;
  };
  users: {
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /**
     * Format: text
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    uid: string;
    /** Format: jsonb */
    counts?: unknown;
  };
  ratios: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at: string;
    /** Format: text */
    text: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description playlists */
  "body.playlists": definitions["playlists"];
  /** Format: bigint */
  "rowFilter.playlists.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.playlists.created_at": string;
  /** Format: text */
  "rowFilter.playlists.uid": string;
  /** Format: text */
  "rowFilter.playlists.name": string;
  /** Format: jsonb */
  "rowFilter.playlists.songs": string;
  /** @description users */
  "body.users": definitions["users"];
  /** Format: timestamp with time zone */
  "rowFilter.users.created_at": string;
  /** Format: text */
  "rowFilter.users.uid": string;
  /** Format: jsonb */
  "rowFilter.users.counts": string;
  /** @description ratios */
  "body.ratios": definitions["ratios"];
  /** Format: bigint */
  "rowFilter.ratios.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.ratios.created_at": string;
  /** Format: text */
  "rowFilter.ratios.text": string;
}

export interface operations {}

export interface external {}
