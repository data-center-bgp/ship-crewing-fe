import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useState } from "react";

const Instructions = () => {
  const [openInstruction, setOpenInstruction] = useState(false);
  const toggleOpen = () => setOpenInstruction((cur) => !cur);

  return (
    <div className="mt-4">
      <Button
        color="yellow"
        onClick={toggleOpen}
        ripple={true}
        placeholder=""
      >
        Show Instructions
      </Button>
      <Collapse open={openInstruction}>
        <Card placeholder="">
          <CardBody placeholder="">
            <Typography placeholder="" className="text-left">
              1. Pastikan browser telah memiliki akses untuk mengambil foto.
              Jika belum, tepat setelah membuka website ini, pastikan izin akses
              kamera diperbolehkan dengan klik "Allow on every visit" di bagian
              atas kiri browser Anda.
              <br />
              2. Isi nomor karyawan dan jabatan Anda.
              <br />
              3. Posisikan badan Anda dengan tegap santai, hadapkan wajah ke
              kamera, dan pastikan wajah tidak tertutup dengan aksesoris,
              sehingga gambar terlihat jelas. Tempat foto juga tidak boleh
              terlalu gelap tapi tidak terlalu terang.
              <br />
              4. Bila posisi foto sudah sesuai, klik "Ambil Foto". Bila foto
              terasa kurang sesuai, bisa klik "Retake" untuk mengambil foto
              ulang.
              <br />
              5. Bila foto terasa sudah sesuai, klik "Kirim Foto" untuk
              mengirimkan foto absensi.
            </Typography>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default Instructions;
