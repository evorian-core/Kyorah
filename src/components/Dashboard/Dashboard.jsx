import { useState } from "react";

import Chat from "../../pages/Chat/Chat";
import Settings from "../../pages/Settings/Settings";
import Account from "../../pages/Account/Account";


export default function Dashboard() {

  const [page, setPage] = useState("chat");


  window.kyorahNavigate = setPage;


  return (
    <>

      {page === "chat" && <Chat />}

      {page === "settings" && <Settings />}

      {page === "account" && <Account />}

    </>
  );
}