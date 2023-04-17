import React from 'react';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';

function ShareButtons(props: any) {
  function shareFacebook() {
    const url = `https://college-event-website.vercel.app/views/event/${props.eventId}/${props.title}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'share', 'width=600,height=400');
  }

  function shareTwitter() {
    const url = `https://college-event-website.vercel.app/views/event/${props.eventId}/${props.title}`;
    const text = 'Check out this cool event!';
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, 'share', 'width=600,height=400');
  }

  return (
    <div>
      <button className='mr-2' onClick={shareFacebook} style={{fontSize: "30px", color: "#3b5998"}}><FaFacebookSquare /></button>
      <button className='mr-2' onClick={shareTwitter} style={{fontSize: "30px", color: "#00acee"}}><FaTwitterSquare /></button>
    </div>
  );
}

export default ShareButtons;
