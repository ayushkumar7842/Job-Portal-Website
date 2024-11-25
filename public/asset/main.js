
async function handleDelete(jobId) {
  const result = confirm("Are you sure you want to delete this job?");
  // if result return false then directly you return
  if (!result) {
    return;
  }
  const url = `/jobs/${jobId}`;

  try {
    // making the api request through fetch
    const response = await fetch(url, {
      method: "DELETE",
    });
    console.log(response);
    // if the response is true
    if (response.ok) {
      const data = await response.json();
      // the data is which are getting are true
      if (data.success) {
        console.log("Job deleted successfully.");
        setTimeout(() => {
          window.location.href = "/jobs";
        }, 2000); // Redirects after 2 seconds
      }
      // When you use window.location.href = '/jobs';, the browser redirects to the specified URL, causing the page to reload. This results in the console being cleared, and you may not be able to see the previous console logs.
    }
    // Redirect to the delete route
  } catch (error) {
    console.error(error);
  }
}
