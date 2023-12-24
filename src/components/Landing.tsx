import Button from "./Button"

function Landing(){
    return(
        <section>
            
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat h-screen"
          style={{backgroundImage:`url('https://t4.ftcdn.net/jpg/05/65/85/35/360_F_565853583_2QYBpvVWOPV3ci2UMYYwjeTbufIJVBNz.jpg')` }}
        >
        <div className="absolute top-0 right-0  h-full w-full overflow-hidden   bg-[hsla(0,0%,0%,0.70)]"></div>
          <div className="container absolute top-1/2 -translate-y-1/2">
            <div className="px-6 text-center text-white md:px-12">
              <h1
                className="mb-6 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl"
              >
                 Awesome 
              </h1>
              <p className="text-3xl">Yuum</p>
              <Button title="Discover More"/>
            </div>
          </div>

        </div>
      </section>
    )
}

export default Landing