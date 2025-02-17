import { SvgIcon } from "@mui/material";


function PlayAnimatedIcon() {
    return (  <SvgIcon>
        <path fill="currentColor" fillOpacity="0" stroke="currentColor" strokeDasharray="40" strokeDashoffset="40" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6l10 6l-10 6Z">
          <animate fill="freeze" attributeName="fill-opacity" begin="0.5s" dur="0.15s" values="0;0.3"/>
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="40;0"/>
        </path>
      </SvgIcon> );
}

export default PlayAnimatedIcon;