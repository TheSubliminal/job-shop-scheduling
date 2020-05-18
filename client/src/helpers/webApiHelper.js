const getFetchUrl = ({ endpoint, queryParams }) => {
  const queryString = new URLSearchParams(queryParams).toString();
  return `${endpoint}${queryParams ? `?${queryString}` : ''}`;
};

const getFetchArgs = (args) => {
  const headers = new Headers();
  if (!args.attachment) {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept','application/json');
  }

  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }
    const formData = new FormData();
    formData.append('image', args.attachment);
    body = formData;
  } else if (args.requestData) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.requestData);
  }

  return {
    method: args.type,
    headers,
    ...(args.type === 'GET' ? {} : { body })
  };
};

const throwIfResponseFailed = async (res) => {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
    throw parsedException;
  }
};

export default async (args) => {
  const res = await fetch(
    getFetchUrl(args),
    getFetchArgs(args)
  );
  await throwIfResponseFailed(res);
  return res;
};