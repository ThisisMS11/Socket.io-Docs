import React from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Pbcard from './Pbcard';
// import inflationimage from '../../assets/Article page/inflation.jpg'


const Article = () => {
  const categories = ['animal', 'web-development', 'android-development', 'cheetah', 'market', 'love', 'building', 'stockmarket']

  return (
    <>
      <Container maxWidth="xl" sx={{ border: 'solid 2px black', height: 610, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>

        {/* popular blogs */}
        <Card sx={{ border: 'solid 2px green', maxWidth: 270, height: 550, padding: '0px 5px' }} >
          <Typography variant="h5" component="h5" sx={{ border: 'solid 2px black', padding: 1, fontWeight: 500, textAlign: 'center' }} className='text-center'>
            POPULAR BLOGS
          </Typography>

          <div id="article-pb-container" className='border-2 border-red-500 p-4 overflow-y-auto w-full h-full '>
            {
              categories.map((e) => {
                // iterating the cards here for the  popular blog
                return (<div className='py-2'>
                  <Pbcard category={e} />
                </div>)
              })
            }
          </div>
        </Card>

        {/* the main blog to be displayed */}
        
        <Card sx={{ border: 'solid 2px green', width: 910, height: 550 }} >
          <Typography variant="h4" component="h2" sx={{ border: 'solid 2px black', padding: 1, fontWeight: 500 }}>
            Tesla Stock Rise
          </Typography>
          <Typography variant="h5" component="h2" sx={{ border: 'solid 2px black', padding: 1, fontWeight: 380 }}>
            Rise Due to Inflation
          </Typography>


          {/* sample image banner in articles */}
          <div className="text-center" id='article-image-banner '>
            <img src="" alt="image not found" className='h-80 mx-auto object-cover w-full' />
          </div>

          <pre style={{ border: 'solid 2px green', height: 400 }}>
            {`SpaceX CEO Elon Musk has once again spoken out against the use of patents, 
                         explaining that the company generally continues to avoid using them.

            In an interview with CNBC, which aired on Wednesday evening, Musk said that using patents in manufacturing is a sign of weakness.

            Musk took TV host Jay Leno on a tour around SpaceX's Starbase facility in Texas, showing him some of the company's Raptor engines, which are designed to fit the Starship spacecraft. He said the engines were built by SpaceX in California.

            It's not the first time the billionaire has criticized the use of patents. In an interview with Wired in 2012, he said that SpaceX has "essentially no patents." He added that it would be "farcical" if the company published its patents "because the Chinese would just use them as a recipe book."

            In a Tesla conference call eight years ago, Musk said patents were a sign that a company was failing to innovate fast enough.

            Musk said in the CNBC interview that SpaceX used strong stainless steel to make the rocket. In response to a question about whether the company had patents for the material, Musk said no.

            SpaceX doesn't "really patent things," he told the outlet. "Patents are for the weak."

            Musk said in the interview that patents were normally used as a "blocking technique" and prevented other companies from progressing. "They just stop others from following you," he told Leno during the tour. "Most patents are bs."`}
          </pre>
        </Card>

        <Card sx={{ border: 'solid 2px green', maxWidth: 250, height: 550 }} >
          this is going to be side panel for popular blogs
        </Card>
      </Container>
    </>
  )
}

export default Article