import Notification from '../schemas/Notification'; 
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkIsProvider) {
      return res.status(401).json({ error: "Only provider can load notifications." });
    }

    const notification = await Notification.find({
      user: req.userId, 
    })
    .sort({ createdAt: 'desc' })
    .limit(20);

    return res.status(200).json(notification);
  }

  async update(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true }
    });

    if (!checkIsProvider) {
      return res.status(401).json({ error: "Only provider can load notifications." });
    }

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.status(201).json(notification);
  }
}

export default new NotificationController(); 