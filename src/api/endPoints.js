const CREATE_COMMENT = "/createComment";
const GET_COMMENT = "/getComment";
const GET_COMMENTS = "/getComments";
const DELETE_COMMENTS = "/deleteComments";

export const createComment = async (name, message) => {
  return getJson(
    fetch(CREATE_COMMENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        message,
      }),
    })
  );
};

export const getComment = async (id) => {
  return getJson(fetch(GET_COMMENT + `/${id}`));
};

export const getComments = async () => {
  return getJson(fetch(GET_COMMENTS));
};

export const deleteComments = async () => {
  return getJson(
    fetch(DELETE_COMMENTS, {
      method: "DELETE",
    })
  );
};

const getJson = async (promise) =>
  await promise.then((result) => result.json());
