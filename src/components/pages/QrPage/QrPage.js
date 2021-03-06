import React, { useState, useEffect } from "react";
import "../TopBar/TopBar.css";
import "./QrPage.css";
import logo from "../../icons/Logo.png";
import qrcode from "../../icons/qrcode.png";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { connect } from "react-redux";
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
              setTenantData([result.data]);
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
        setQrCode(tenantData[0].qrCode);
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
    aEl.download = tenantData[0].name + "qrcode.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  if(tenantRetrieved){
    console.log("qrcode",tenantData[0])
  }
  return (
    <div className="qrcontainer">
      <div className="topbar">
        <div className="left"  style={{color: tenant.profileColor}}>Print QR Codes</div>

        <TopBar />
      </div>
{tenantRetrieved? (<div className="printqrsection">
        <div className="qrgrid">
          <div className="qrimage">
            <QRCode id="qrCodeEl" size={300} value={qrCode} />
          </div>
          <div className="qrsettings">
            
            <div className="downloadqr">
              <button  style={{background: tenant.profileColor}} className="downloadqrbutton" onClick={downloadQRCode}>
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
          <ThreeDots color={tenant.profileColor} height={80} width={80} />
        </div>
      )}
      
    </div>
  );
}

const mapStateToProps = ({ session }) => ({
  tenant: session.user,
});

export default connect(mapStateToProps)(QrPage);
