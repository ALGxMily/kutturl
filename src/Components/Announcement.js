export default function Announcement({ controlShow }) {
  const [show, setShow] = React.useState(controlShow);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    console.log("show", show);
    console.log("controlShow", controlShow);
    setShow(controlShow);

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [controlShow]);
}
