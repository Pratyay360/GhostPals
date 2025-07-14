import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Ghost } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-background text-foreground'>
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-b from-background to-muted/50'>
          <div className='container px-4 md:px-6 mx-auto flex flex-col items-center'>
            <Card className='w-full max-w-2xl mx-auto shadow-lg border-none bg-transparent'>
              <CardHeader className='flex flex-col items-center'>
                <Ghost className='h-20 w-20 md:h-24 md:w-24 text-primary mb-4' />
                <CardTitle className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight text-center'>
                  Welcome to <span className='text-primary'>Ghost Pals</span>
                </CardTitle>
                <CardDescription className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-4'>
                  Ever wondered who you follow that doesn't follow you back on
                  Instagram? Ghost Pals helps you uncover those 'ghost'
                  accounts. Simply upload your followers and following lists,
                  and we'll show you the difference.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex justify-center mt-6'>
                <Link href='/calculate'>
                  <Button size='lg' className='px-8 py-6 text-lg'>
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section id='how-to' className='w-full py-16 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6 mx-auto'>
            <div className='flex flex-col items-center text-center space-y-6 mb-16'>
              <span className='inline-block rounded-lg bg-muted px-4 py-2 text-sm font-medium'>
                How It Works
              </span>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter max-w-4xl'>
                How to Get Your Instagram Data
              </h2>
              <p className='text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                To use Ghost Pals, you need to request your data from Instagram.
                Here's how:
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto'>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl font-bold'>
                    1. Go to Your Profile
                  </CardTitle>
                  <CardDescription>
                    Open the Instagram app or website and navigate to your
                    profile page.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl font-bold'>
                    2. Access Your Activity
                  </CardTitle>
                  <CardDescription>
                    Tap the menu icon, then go to 'Your Activity' and select
                    'Download Your Information'.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl font-bold'>
                    3. Request a Download
                  </CardTitle>
                  <CardDescription>
                    Request a download and make sure to select 'JSON' as the
                    format. You only need the 'followers_and_following' data.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className='text-xl font-bold'>
                    4. Upload Your Files
                  </CardTitle>
                  <CardDescription>
                    Once your download is ready, you'll receive an email.
                    Download the zip file, extract it, and you'll find the{' '}
                    <code>followers.json</code> and <code>following.json</code>{' '}
                    files inside the <code>followers_and_following</code>{' '}
                    folder. Upload them on our calculate page.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='border-t py-8 px-4 md:px-6'>
        <div className='container mx-auto text-center'>
          <p className='text-sm text-muted-foreground'>
            Built with Next.js and shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  );
}
