import Webcam from "react-webcam";
import { Button, Typography, Spinner, Input } from "@material-tailwind/react";
import { useState, useRef, useCallback, useEffect } from "react";
import NotificationAttendance from "./AttendanceNotification";

export default function Attendance() {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crewId, setCrewId] = useState("");
  const [position, setPosition] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        },
        (error) => {
          console.log(error);
          handleOpenNotif("Please enable location to continue.");
        }
      );
    } else {
      handleOpenNotif("Geolocation is not supported by this browser.");
    }
  }, []);

  const capture = useCallback(() => {
    setIsCapturing(true);
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc || null);
    setIsCapturing(false);
  }, [webcamRef, setImgSrc]);

  const retake = useCallback(() => {
    setImgSrc(null);
  }, [setImgSrc]);

  const handleCrewIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCrewId(e.target.value);
      setIsFormFilled(e.target.value.trim() !== "" && position.trim() !== "");
    },
    [setCrewId, position]
  );

  const handlePositionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPosition(e.target.value);
      setIsFormFilled(e.target.value.trim() !== "" && crewId.trim() !== "");
    },
    [setPosition, crewId]
  );

  const handleOpenNotif = useCallback(
    (msg: string) => {
      setNotifMsg(msg);
      setNotifOpen(true);
    },
    [setNotifMsg, setNotifOpen]
  );

  const handleCloseNotif = useCallback(() => {
    setNotifOpen(false);
  }, [setNotifOpen]);

  const handleSubmit = () => {
    const isFormValid = crewId.trim() !== "" && position.trim() !== "";
    setIsFormFilled(isFormValid);
    if (isFormValid) {
      if (imgSrc) {
        handleOpenNotif("Absensi terkirim!");
      } else {
        handleOpenNotif("Mohon untuk mengambil foto terlebih dahulu!");
      }
    } else {
      handleOpenNotif("Mohon mengisi form absensi terlebih dahulu!");
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col m-12 p-12">
          <Typography variant="h4" color="white" placeholder={""}>
            Form Absensi Crew
          </Typography>
          <form className="flex flex-col pr-5">
            <div className="flex flex-col justify-center w-72">
              <Typography
                variant="h6"
                color="white"
                className="m-3 justify-start"
                placeholder={"ID Crew"}
              >
                ID Crew
              </Typography>
              <Input
                placeholder={"Ketik disini..."}
                size="md"
                color="white"
                label="ID Crew"
                crossOrigin={undefined}
                className="w-full"
                required
                onChange={handleCrewIdChange}
              />
            </div>
            <div className="flex flex-col justify-center w-72">
              <Typography
                variant="h6"
                color="white"
                className="m-3 justify-start"
                placeholder={"Jabatan"}
              >
                Jabatan
              </Typography>
              <Input
                placeholder={"Ketik disini..."}
                size="md"
                color="white"
                label="Jabatan"
                crossOrigin={undefined}
                required
                onChange={handlePositionChange}
              />
            </div>
          </form>
        </div>
        <div>
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <div className="relative">
              <Webcam height={600} width={600} ref={webcamRef} />
              {isCapturing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner className="w-12 h-12" />
                </div>
              )}
            </div>
          )}
          <div>
            {imgSrc ? (
              <Button
                onClick={retake}
                className="mt-7 mr-3"
                color={"red"}
                placeholder={"Retake Photo"}
              >
                Retake
              </Button>
            ) : (
              <Button
                onClick={capture}
                className="mt-7 mr-3"
                color={"teal"}
                placeholder={"Ambil Foto"}
              >
                {isCapturing ? (
                  <Spinner className="w-5 h-5 mx-auto" />
                ) : (
                  "Ambil Foto"
                )}
              </Button>
            )}
            <Button
              placeholder={"Submit"}
              onClick={handleSubmit}
              color={"blue"}
              className="mt-7 ml-3"
            >
              Kirim Foto
            </Button>
            <NotificationAttendance
              isOpen={notifOpen}
              onClose={handleCloseNotif}
              message={notifMsg}
            />
          </div>
        </div>
      </div>
    </>
  );
}
