import createError from "http-errors";

import Positions from "../models/Positions.js";

const getUserData = async (req, res, next) => {
  try {
    const user = await Positions.find({ userId: req.user.uid });

    if (!user) {
      return next(createError(404, "유저를 찾을 수 없습니다."));
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const saveUserData = async (req, res, next) => {
  try {
    const {
      userId,
      positionId,
      name,
      firstSpeakerPosition,
      secondSpeakerPosition,
      listenerPosition,
    } = req.body;

    if (
      !userId ||
      !positionId ||
      !name ||
      !firstSpeakerPosition ||
      !secondSpeakerPosition ||
      !listenerPosition
    ) {
      return next(createError(400, "필수 필드가 누락되었습니다."));
    }

    const existingPosition = await Positions.findOne({ positionId, userId });

    if (existingPosition) {
      return next(createError(409, "해당 positionId가 이미 존재합니다."));
    }

    const newPosition = new Positions({
      userId,
      positionId,
      name,
      firstSpeakerPosition,
      secondSpeakerPosition,
      listenerPosition,
    });

    await newPosition.save();

    res.status(201).json({
      message: "포지션이 성공적으로 저장되었습니다.",
      position: newPosition,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserData = async (req, res, next) => {
  const { positionId } = req.params;

  if (!positionId) {
    return next(createError(400, "positionId가 제공되지 않았습니다."));
  }

  try {
    const position = await Positions.findOne({
      positionId,
    });

    if (!position) {
      return next(createError(404, "해당 포지션을 찾을 수 없습니다."));
    }

    await Positions.deleteOne({ positionId });

    res.status(200).json({
      message: "포지션이 성공적으로 삭제되었습니다.",
    });
  } catch (error) {
    next(error);
  }
};

export { getUserData, saveUserData, deleteUserData };
