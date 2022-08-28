import dynamic from 'next/dynamic';

const App = () => (
  <html lang="en">
    <body id="handlebars-tmp" style={{ position: 'relative', width: 828, height: 1792, 'background-color': '#f6fc53' }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <div
          style={{
            position: 'absolute',
            width: 828,
            height: 150,
            'background-color': '#f6fc53',
            'z-index': -1,
            top: 0,
            left: 0,
          }}
        />
        <img
          alt="image"
          src="https://littlelemonfriends.mypinata.cloud/ipfs/QmU9hSw4nbMvWDKwnuxuD51CaWnD39WfFM2hZgY6evAGXM"
          width="828"
          height="828"
        />
      </div>
    </body>
  </html>
);

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
