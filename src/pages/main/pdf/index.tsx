import Pdf from "../../../generator/pdf";
import { PDFViewer } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer>
    <Pdf student={""} data={[]} />
  </PDFViewer>
);