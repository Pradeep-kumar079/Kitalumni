const postmodel = require("../model/postmodel");

exports.getReportPage = (req, res) => {
  res.render("report");
};

exports.submitReport = async (req, res) => {
  try {
    const { postId, reason } = req.body;
    const userId = req.session.userId;

    if (!postId || !reason) {
      return res.status(400).json({ error: "Post ID and reason are required" });
    }

    if (!userId) {
      return res.status(401).json({ error: "User must be logged in to report" });
    }

    const post = await postmodel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const alreadyReported = post.reports.some(
      report => report.userId.toString() === userId.toString()
    );

    if (alreadyReported) {
      return res.status(400).json({ error: "You have already reported this post." });
    }

    post.reports.push({ userId, reason });
    await post.save();

    if (post.reports.length >= 10) {
      await postmodel.findByIdAndDelete(postId);
      return res.status(200).json({ message: "Post deleted due to multiple reports.", deleted: true });
    }

    res.status(200).json({ message: "Report submitted successfully.", deleted: false });
  } catch (error) {
    console.error("Error reporting post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
