import moment from "moment";
import { onSubmit, getAllEvents } from "../../../infrastructure/calender";
import { logError } from "../../common/Utils";

const actions = {
  onSubmit:
    (values) =>
    async ({ setState }) => {
      try {
        console.log(values);
        await onSubmit(values);
      } catch (error) {
        logError("login", error);
      }
    },
  getEvents:
    () =>
    async ({ setState }) => {
      try {
        const res = await getAllEvents();
        let data = res.results;
        let modData = data.map((d) => {
          return {
            id: d?.id,
            title: d?.title,
            type:
              d?.eventtype === "0"
                ? "event"
                : d?.eventType === "1"
                ? "task"
                : "reminder",
            label: "success",
            description: d?.description,
            date: [
              moment(d?.startDate).format("MM/DD/YYYY"),
              moment(d?.endDate).format("MM/DD/YYYY"),
            ],
            time: [
              moment(d?.startTime, "HH:mm").format("h:mm a"),
              moment(d?.endTime, "HH:mm").format("h:mm a"),
            ],
          };
        });
        logError("modData", modData);
        setState({ events: modData });
      } catch (error) {
        logError(error, "get event error");
      }
    },
};

export default actions;
