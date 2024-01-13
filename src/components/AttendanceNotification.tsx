import React from "react";
import { Button } from "@material-tailwind/react";

interface NotificationAttendanceProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const NotificationAttendance: React.FC<NotificationAttendanceProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "visible" : "hidden"}`}>
      <div
        className="modal-overlay fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-container bg-white rounded-lg shadow-xl transform transition-transform duration-300 ease-in-out fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">{message}</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            className="text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={onClose}
            placeholder={"Tutup"}
            color={"red"}
            ripple={true}
          >
            TUTUP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationAttendance;