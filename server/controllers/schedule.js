import Schedule from "../modules/scheduleScheme.js";

export const getSchedule = async (req, res, next) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    throw new Error("Failed to get schedule by group");
  }
};

export const getScheduleByGroup = async (req, res, next) => {
  try {
    const groupId = req.body.group;
    const schedules = await Schedule.find({ group: groupId });
    res.status(200).json(schedules);
  } catch (error) {
    throw new Error("Failed to get schedule by group");
  }
};

export const addSchedule = async (req, res, next) => {
  try {
    const scheduleData = req.body;
    const schedule = new Schedule(scheduleData);
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    throw new Error("Failed to add schedule");
  }
};

export const editSchedule = async (req, res, next) => {
  try {
    const scheduleId = req.params.id;
    const updatedScheduleData = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      scheduleId,
      updatedScheduleData,
      { new: true }
    );
    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit schedule");
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    const scheduleId = req.params.id;
    await Schedule.findByIdAndDelete(scheduleId);
    res.status(200).json({ scheduleId: scheduleId });
  } catch (error) {
    throw new Error("Failed to delete schedule");
  }
};
