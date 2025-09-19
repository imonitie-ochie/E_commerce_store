import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SiMinutemailer } from "react-icons/si"


const Footer = () => {
  
  return (
    <div className='bg-black gap-3 p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:justify-around'>
      <div>
        <Link to={'/'} ><strong className='text-white text-[30px]'>PrimeCircuit</strong></Link>
        <p className='text-white mb-4'>The customer is at the heart of our unique business model, which includes design.</p>
        <img src={`data:image/png;base64,UklGRoYKAABXRUJQVlA4WAoAAAAQAAAA2QAAFgAAQUxQSFECAAABkKtt29o2FhjkX2FmPIMURmbm9gAYpoxl5gPI2KnNXmZmZuYafkmXYW78hz/5Fc0R4cCRJKepkcjgvTtweoK07UM6iYTfnSKFqJSdTPIEkBQ/3R4i09FvcaRJpnGUkUVK027y5Gj1yWQikUokxpUwvgbz58YwXeW6N6kEEv5othTJD6J5GSHbMWMQzimFIu/Cq9wsUdRrcJH/J0sUzYKr/KLGM7B0CdlHs3FXIpTwHtxelRK7ilc5R6aUpmB5TU/D/pRRlLm48xolshO3i+x/7RxutkIpT8Iyus5hv8tJC2miKBdouxx23mEcn+jMAfRkwdjrIc77xy/84XWNGL+RPlU4RQhPKPsN486z7Ru3Jt4nxAjGDJyThwTMhOm4v7YT6jCbXnJ4IkQw+IOsuHdaME3mIIMvxrjpU4XiOH3IbOi+dkLBe5Pi2iXcY3NQMVXcQidiUHh+RRS8NRGCmFwJjs2GB4wdfMJl//jlD3Tu+AeH5XTmwIXwQ2xcsuHp3xgpB+h5GC8nzcNdoR3AHaDdwM23+Y3hhG+wtyWkqQOwM7ReXC+tHzYwlVTyDPaOaWtfWQYS6+lyso/k6u3/MhyIaZ3tIftIbeqzMkiTMlZfk0qJ9py1TM65YaRNg5t8NIZhmObYGjL/tlfJZP8vfWlxJNa7NZpa0drVjaSrpZxstRStae+G0tlYopBVanWdYJV1mkTehyWNYJXtNVGJHK3yFrC7WitUSdUYlphK/2cmheMMic6iSoiMHInrOlCkHo/IdJVKlOkMSTxMdwDeXZoqAQBWUDggDggAAHAmAJ0BKtoAFwA+bTCTRyQjIaEoGSyQgA2JagDNgdpf/hP+04/x7LnzlryTepH7QPUw6UPmA/j39V/XL3n/Qj/hPNJ6xv0APLW9kn+1/8/9wPaqzTfsQ/qH5Cdcr529rMoS+K/Lf15/xvhftbf3Xe0QAfiv8w/0n9A8YL+09C/px/pP5h6ov+d/K/4J8EHyH2AP5X/XP9N+UXvxf7flx+iv+/7hP8q/sn/C7BPopftoMAqtvUxXbV5eG7GLLnV8O7dD4aRdZEOOjLB+rxVZwL/Qhk3tWMkTeuvbmI9wPLmUYaPho7HjKN5lF///XUC49OwdAewScGue6U/e1NR1ZKYZz6BnrWagNHrqq8U6huK0+7r/7TM5ySQqwM/EnRNdxJHQpGCx6vXB47bi+yXNmLWGM2Dt99Lom56ahwAA/sc3i635iy4CvitMmDUGOuH2BcZmcGMQXPESB1efsRU8rtX9Ha0M3f0vxC9bL7QcSUu/X/fj/J0/O7+vRvgmFTA+7Gqthpxa1ih3qlmx1iy9nWMiyUQQtXG/dQ+wA1XGSwd7eragYrxEDwGoisXLeg4WVmE6b7WeCmtsyuTgVL5euG0QcY8mPdsj7yMwffNjb14JGvKb8z1q2tlpRB2L2mFX94iyDvdOhps2KqR+QeUMbWNxx3HIr7h+7Fx/1GHop2NAlB+ssFOUw7tEF9YxLIoD1ZMqRjSYHy+pYa9QoNuf0BgRGNdRp1jLNNSgTQrURvbSRL1YNsUJbA3Cz9vJfjOaahltc19fZpm9X2x8JiSdymM48Sl78zmh6yQyloQ6OxwXkSvmJYwImeoVZVL4QZbHvMMt0kkbeW67j3a7A7z9/8d3KYY/OfvEN8/nK042KM7eR7Bp/2Ob84jFrhd84DYEUmIV19KmXTi+uzznSyzbeRSrOMVq/ln8EvogVTXiz4FCtNm+fsl4E0v/blJ/mKtHSX8IdGmS+TAnf1tBmfo0dv/2feESqeH+nJHqYVKIFKn378JevsJirrP32EMLFy6K73KDGy8EAGdWJQ70C6dFEQVAPR+kFbOsi1B9i6lGUhsX6847JPZCvbrm90b3mIpwXt0izMBAkDg946lJ6CUJ0hETHdEzqTt8J/UylfXqlSXJBrrNwUgrVvpZ7VMXUWYXnQf71Gqkph56sPPNNAe/QyrmZKSszJ5/wIqM4sq1Ylb4Y5abqv+U58jSfaC2xeCyoyLvlX0meoUgjX9UxmuKf1BtsH4sUjW/dhAzITSd91GzC4tMPhVlHN/a4t56OYwyKtT5P92x42cO6EDUXVTDzshWO4l/uSEfiv+er1z/xXYmaAgEMscobmVvnjUBgc8P9zhBu3KGpv4T4eyFXldLDxSWRyyCgvVsmfkIfV7llox7qwRA2jbuiGNn/+DwUfXT2hgEjHoKSEVMEct9GmYyoVEoaAkmxo3ixMD4mzL/cDW04n/9Kl31BQlyq6sGfyd11wgIfBVX8Q9PnJ47Ukv6fLfe/6cm/W0/ar2yjqFt6rw7kVLfgRUe+m643bVcYgcCFsZnagF20/7kpoNrVpVoplXWwC/C6UzpBeAxWyWpVZY4lTGCI6Bis+y8ee2jtL0oCF+V5hVVseuOEJR7FNen1UuyZKwCbg5o10DetY1rajRA5dBbGLM2+uo+Km7IVDGk22Fv1CPWCiy8IqiCLwHUMzmukMCPWqMl/9CoxG9Ka9drtwt8/PFa9GWls83m1NtnCb09mT/4tmPVSa419B//3syqRcSDqkN13dFA7Xd6shoSVmgJ7qODiNAag5bg3B1QyNidwa0LsFXQarZ/tSllnqgCZLASiEVzOS+fGbdP0iAnhJT0s4HxpF8ukIuFqpmDBv2mplBuJn66J2/vzBZoBnvem4aUiMEuVOV5PivBj+j/pkOBXdYPJQnzzA2XywGNz0LE3x6rJNuN4cJEH681vOma44tMspgxL/86v1czNWGaTH873xyfoG8mdPbovSNAMXg9PVlgw2+dVf/nibw05TigADkWcNxyIh1s4srAU4h5jbeUaSr/pNwHFIgVBLi54u+eiS81wthRVfbPLXgdvPlRz5BRfot4cS7spq8tl3YP7AfAD5cK6/5iUqzpxf71VK5XmSn6NJOEADOb31fTp2Z8Lu26AjtMiLvGuY7def7S+JLPkKOaJd5/4zVx/Cupzhf+PDR+8ShaDGUFovfmiX/VEfFQrqK9chkawEeA+mXsAMeX2f9SEOe1SN8a3feZ5KM2/snbP1Xe08YPcObP2t78KEu+8hi7BcqMouIj7kCkeCyDSFdFDoQj2yjpAC3UpytUad1D4NuGL2f1tZmGECH0Ffh3W1Ag4TVgYf9q8LAftiBhcmeYNunO8PUL3aBVGGO4+oaHpJO3TSGqjrIZd0KDUovXCSoGwxGKErEyS9hRx7VNySJfvLYAXtz/h1WffRr4OgyOehxD9EAgkLhxdjIcBRd/8F/szEXPUYEisETudVH6DNSchjPxHrYu1AdQnSeaJslB99qUojRfZGjJuBlxp+37spxUWIYKW1G+pkc2AzsWw7jtMjnnCtPDRG3vhclNWqzED/6+JtCTCEIqdiBHkAI5fSMynqdM5+Nnm6KfurzNXVV8YJhoYS683FdMLYLsVawxbgRJdJAfIk25GNS8BFUGtJf81YLZXDuWXF0Mul+U13+CPb6HqLpfG0IZsLeYdU7DpK3qYoA8AyAvz4Yl1gxJIMo1yO2tecVnVwG37f+Ma+gYaL/0Qv5AAAA=`} alt="" />
      </div>
      <div className='text-white grid grid-col'>
        <strong>SHOPPING</strong>
        <a href="#">Men Wears</a>
        <a href="#">Women Wears</a>
        <a href="#">Electronics</a>
        <a href="#">Jeweleries</a>
      </div>
      <div className='text-white grid grid-col'>
        <strong>INFORMATION</strong>
        <a href="#">Contact Us</a>
        <a href="#">Payment Methods</a>
        <a href="#">Delivery</a>
        <a href="#">Returns and Exchange</a>
      </div>
      <div className='text-white'>
        <strong>NEWSLETTER</strong>
        <p className='mb-3'>Be the first to know about new arrivals, look books, sales & promos!</p>
        <div className='flex items-center mb-3'>
          <input className='bg-transparent mt-2 border-white border-b-2' type="email" placeholder= ' Your  E-mail' />
          <button className='mt-2'><SiMinutemailer /></button>
        </div>
      </div>
    </div>
  )
}

export default Footer