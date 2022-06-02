import React, { useState, useEffect } from "react";
import "../TopBar/TopBar.css";
import "./QrPage.css";
import logo from "../../icons/Logo.png";
import qrcode from "../../icons/qrcode.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { connect } from "react-redux";
<<<<<<< HEAD

function QrPage({tenant}) {
=======
import QRCode from "qrcode.react";
import TopBar from "../TopBar/TopBar";
import ReactToPrint from "react-to-print";
import { ThreeDots } from "react-loader-spinner";
import { SocketContext } from "../../socketContext";

function QrPage({ tenant }) {
  const localUrl = process.env.REACT_APP_TENANTURL;
  const [tenantData, setTenantData] = useState([]);
  const [tenantRetrieved, setTenantRetrieved] = useState(false);
  const [qrCode, setQrCode] = useState();

  // Get Tenant Data
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log("mounted");
      if (tenant.tenant_id != undefined) {
        const url = localUrl + "/user/" + tenant.tenant_id;
        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/JSON" },
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "SUCCESS") {
              setTenantData(() => result.data);
              setTenantRetrieved(() => true);
            } else {
              setTenantRetrieved(() => false);
            }
          });
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenant, tenantRetrieved]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (tenantRetrieved === true) {
        setQrCode(tenantData.qrCode);
        console.log("Tenant Data is defined");
      }
    }
    return () => {
      mounted = false;
    };
  }, [tenant, tenantRetrieved]);

  function downloadQRCode() {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL);
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = tenantData.name + "qrcode.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

  return (
    <div className="qrcontainer">
      <div className="topbar">
        <div className="left">Print QR Codes</div>

<<<<<<< HEAD
        <div className="right">
          <div className="imagecontainer">
            <img src={tenant.profileimage} className="image" />
          </div>
          <div className="toptext">{tenant.name}</div>
        </div>
=======
        <TopBar />
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
      </div>
{tenantRetrieved? (<div className="printqrsection">
        <div className="qrgrid">
          <div className="qrimage">
            <QRCode id="qrCodeEl" size={300} value={qrCode} />
          </div>
          <div className="qrsettings">
<<<<<<< HEAD
            <div className="printqr">
              <button className="printqrbutton">Print QR Code</button>
            </div>
=======
            {/* <div className="printqr">
            <ReactToPrint
        trigger={() => <button className="printqrbutton">Print QR Code</button>}
        content={() =>  <QRCode 
          id="qrCodeEl"
          size={300}
         value={"http://localhost:3000"} 
         className="qr" />}
      />

              
            </div> */}
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53
            <div className="downloadqr">
              <button className="downloadqrbutton" onClick={downloadQRCode}>
                Download as PNG
              </button>
            </div>
          </div>
        </div>
      </div>): (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots color="#f10c0c" height={80} width={80} />
        </div>
      )}
      
    </div>
  );
}

<<<<<<< HEAD
const mapStateToProps = ({session}) => ({
  tenant: session.user
})
=======
const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});
>>>>>>> 6975d07bc900b6551a12849b964634c3d5428e53

export default connect(mapStateToProps)(QrPage);
