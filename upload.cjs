const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwfcofnrd",
  api_key: "616751826717264",
  api_secret: "j9j8BANHui4FQiBSbJJE_a0_jjk",
});

async function uploadSubtitle() {
  try {
    const result = await cloudinary.uploader.upload("./2.srt", {
      resource_type: "auto",
      public_id: "2.srt",
      folder: "dd",
      type: "upload",
    });
    console.log("Subtitle uploaded successfully:", result.secure_url);
  } catch (error) {
    console.error("Error uploading subtitle:", error);
  }
}

(async () => {
  let videoURL = cloudinary.url("dd/1", {
    resource_type: "video",
    transformation: [
      { aspect_ratio: "9:16", crop: "fill" },
      {
        overlay: {
          resource_type: "subtitles",
          public_id: "dd/2.srt",
          start_offset: 3,
        },
      },
      { flag: "layer_apply" },
    ],
  });

  console.log(videoURL);
})();

// uploadSubtitle();
