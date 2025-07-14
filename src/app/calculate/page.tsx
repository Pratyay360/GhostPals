'use client';
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserMinus, Upload, Ghost, RefreshCw, Copy, Check, Users, UserPlus } from "lucide-react";
import { toast } from 'sonner';

interface User {
  href: string;
  value: string;
  timestamp: number;
}

interface UserData {
  title: string;
  media_list_data: unknown[];
  string_list_data: User[];
}

export default function CalculatePage() {
  const [key, setKey] = useState(0);
  const [followers, setFollowers] = useState<UserData[] | null>(null);
  const [following, setFollowing] = useState<UserData[] | null>(null);
  const [notFollowingBack, setNotFollowingBack] = useState<User[]>([]);
  const [notFollowingYou, setNotFollowingYou] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState({ notFollowingBack: false, notFollowingYou: false });
  const followersFileRef = useRef<HTMLInputElement>(null);
  const followingFileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'followers' | 'following') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        let parsedData = data;

        if (Array.isArray(data)) {
          parsedData = data;
        } else if (data.relationships_followers) {
          parsedData = data.relationships_followers;
        } else if (data.relationships_following) {
          parsedData = data.relationships_following;
        } else if (data.string_list_data && Array.isArray(data.string_list_data)) {
          parsedData = [data];
        }

        if (!Array.isArray(parsedData)) {
          throw new Error("Invalid file structure - expected an array of objects");
        }

        const isValid = parsedData.every(item =>
          item &&
          typeof item === 'object' &&
          Array.isArray(item.string_list_data) &&
          item.string_list_data.every((user: User) =>
            user &&
            typeof user.value === 'string' &&
            typeof user.href === 'string'
          )
        );

        if (!isValid) {
          throw new Error("Invalid file structure - missing required fields");
        }

        if (type === 'followers') {
          setFollowers(parsedData);
          toast.success(`Loaded ${parsedData.reduce((acc, item) => acc + item.string_list_data.length, 0)} followers`);
        } else {
          setFollowing(parsedData);
          toast.success(`Loaded ${parsedData.reduce((acc, item) => acc + item.string_list_data.length, 0)} following`);
        }
      } catch (error) {
        toast.error(`Error parsing JSON: ${(error as Error).message}`);
      }
    };
    reader.readAsText(file);
  };

  const calculateDifference = () => {
    if (!followers || !following) {
      toast.warning("Please upload both files first.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        const followersSet = new Set(
          followers.flatMap(userData =>
            userData.string_list_data.map(user => user.value)
          )
        );

        const followingSet = new Set(
          following.flatMap(userData =>
            userData.string_list_data.map(user => user.value)
          )
        );

        const notFollowing = following.flatMap(userData =>
          userData.string_list_data.filter(user => !followersSet.has(user.value))
        );

        const notFollowingYouBack = followers.flatMap(userData =>
          userData.string_list_data.filter(user => !followingSet.has(user.value))
        );

        setNotFollowingBack(notFollowing);
        setNotFollowingYou(notFollowingYouBack);

        const totalFollowers = followers.reduce((acc, item) => acc + item.string_list_data.length, 0);
        const totalFollowing = following.reduce((acc, item) => acc + item.string_list_data.length, 0);

        toast.success(`Analysis complete!
          Followers: ${totalFollowers} | Following: ${totalFollowing}
          Not following back: ${notFollowing.length} | You don't follow back: ${notFollowingYouBack.length}`);
      } catch (error) {
        toast.error(`Error processing files: ${(error as Error).message}`);
        setNotFollowingBack([]);
        setNotFollowingYou([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const clearFiles = () => {
    setFollowers(null);
    setFollowing(null);
    setNotFollowingBack([]);
    setNotFollowingYou([]);
    setCopied({ notFollowingBack: false, notFollowingYou: false });
    if (followersFileRef.current) followersFileRef.current.value = "";
    if (followingFileRef.current) followingFileRef.current.value = "";
  };

  const copyToClipboard = (users: User[], type: 'notFollowingBack' | 'notFollowingYou') => {
    const textToCopy = users.map(user => user.value).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(prev => ({ ...prev, [type]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
      toast.success("Copied to clipboard!");
    });
  };

  const renderUserList = (users: User[], type: 'notFollowingBack' | 'notFollowingYou') => {
    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <Ghost className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h3 className="font-medium text-lg mb-2">
            {loading ? 'Analyzing your data...' : 'No accounts found'}
          </h3>
          <p className="text-muted-foreground text-sm max-w-md">
            {loading
              ? 'Processing your followers and following lists'
              : type === 'notFollowingBack'
                ? 'Great! Everyone you follow also follows you back.'
                : 'You follow back everyone who follows you.'}
          </p>
        </div>
      );
    }

    return (
      <ul className="divide-y">
        {users.map(user => (
          <li key={user.href} className="p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="border">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.value.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <a
                  href={user.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline truncate block"
                  title={user.value}
                >
                  @{user.value}
                </a>
                <p className="text-xs text-muted-foreground">
                  {new Date(user.timestamp * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <main className="container py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" /> Upload Instagram Data
              </CardTitle>
              <CardDescription>
                Upload your <code>followers.json</code> and <code>following.json</code> files from your Instagram data download.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="followers-file" className="text-sm font-medium block mb-2">
                  Followers File
                  {followers && (
                    <span className="text-green-600 ml-2">
                      ✓ {followers.reduce((acc, item) => acc + item.string_list_data.length, 0)} loaded
                    </span>
                  )}
                </label>
                <Input
                  key={`followers-${key}`}
                  id="followers-file"
                  type="file"
                  ref={followersFileRef}
                  onChange={(e) => handleFileChange(e, 'followers')}
                  accept=".json"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Usually named: followers_1.json or relationships_followers.json
                </p>
              </div>
              <div>
                <label htmlFor="following-file" className="text-sm font-medium block mb-2">
                  Following File
                  {following && (
                    <span className="text-green-600 ml-2">
                      ✓ {following.reduce((acc, item) => acc + item.string_list_data.length, 0)} loaded
                    </span>
                  )}
                </label>
                <Input
                  key={`following-${key}`}
                  id="following-file"
                  type="file"
                  ref={followingFileRef}
                  onChange={(e) => handleFileChange(e, 'following')}
                  accept=".json"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Usually named: following.json or relationships_following.json
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateDifference}
                  disabled={!followers || !following || loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Followers'
                  )}
                </Button>
                <Button
                  onClick={() => {
                    clearFiles();
                    setKey(k => k + 1);
                  }}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ghost className="h-5 w-5" /> Analysis Results
              </CardTitle>
              <CardDescription>
                View your follower relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="not-following-back">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="not-following-back">
                    <UserMinus className="h-4 w-4 mr-2" />
                    Don't Follow Back ({notFollowingBack.length})
                  </TabsTrigger>
                  <TabsTrigger value="not-following-you">
                    <UserPlus className="h-4 w-4 mr-2" />
                    You Don't Follow ({notFollowingYou.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="not-following-back">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      People you follow who don't follow you back
                    </p>
                    {notFollowingBack.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(notFollowingBack, 'notFollowingBack')}
                        className="text-primary"
                      >
                        {copied.notFollowingBack ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied.notFollowingBack ? 'Copied!' : 'Copy List'}
                      </Button>
                    )}
                  </div>
                  <div className="h-96 overflow-y-auto border rounded-lg">
                    {renderUserList(notFollowingBack, 'notFollowingBack')}
                  </div>
                </TabsContent>
                <TabsContent value="not-following-you">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">
                      People who follow you but you don't follow back
                    </p>
                    {notFollowingYou.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(notFollowingYou, 'notFollowingYou')}
                        className="text-primary"
                      >
                        {copied.notFollowingYou ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied.notFollowingYou ? 'Copied!' : 'Copy List'}
                      </Button>
                    )}
                  </div>
                  <div className="h-96 overflow-y-auto border rounded-lg">
                    {renderUserList(notFollowingYou, 'notFollowingYou')}
                  </div>
                </TabsContent>
              </Tabs>
              {(notFollowingBack.length > 0 || notFollowingYou.length > 0) && (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">Followers</span>
                    </div>
                    <span className="text-lg font-bold">
                      {followers?.reduce((acc, item) => acc + item.string_list_data.length, 0) || 0}
                    </span>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <UserPlus className="h-4 w-4" />
                      <span className="font-medium">Following</span>
                    </div>
                    <span className="text-lg font-bold">
                      {following?.reduce((acc, item) => acc + item.string_list_data.length, 0) || 0}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <h3 className="font-medium text-lg mb-2">How to Get Your Instagram Data</h3>
          <p className="text-muted-foreground text-sm mb-4">
            1. Go to your Instagram Settings → Privacy and Security → Download Data<br />
            2. Request a download (it may take up to 48 hours to receive)<br />
            3. Look for followers_1.json and following.json files in the downloaded ZIP
          </p>
          <p className="text-xs text-muted-foreground">
            Note: We don&apos;t store any of your data. All processing happens in your browser.
          </p>
        </div>
      </main>
    </>
  );
}
