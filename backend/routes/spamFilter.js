export class SpamFilter {
  constructor(db) {
    this.db = db;
    this.shareLimit = 2;
    this.timeWindow = 3600000; // 1 hour in milliseconds
  }

  async logShare(userId) {
    await this.db.collection("userActivity").insertOne({
      userId,
      action: "share",
      timestamp: Date.now(),
    });
  }

  async isSpam(userId) {
    const now = Date.now();
    const activities = await this.db.collection("userActivity").find({
      userId,
      action: "share",
      timestamp: { $gt: now - this.timeWindow },
    }).toArray();

    return activities.length > this.shareLimit;
  }
}

