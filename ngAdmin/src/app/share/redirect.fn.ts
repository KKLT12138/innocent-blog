export let needRedirect = (status, url) => {
  if (status == 3) {
    location.href = url;
  }
};
