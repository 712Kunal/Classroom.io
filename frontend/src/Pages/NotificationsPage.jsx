import { Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

function NotificationsPage() {
  return (
    <div className="Container w-full h-screen mx-auto border-2 border-gray-200">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Bell size={34} className="text-black dark:text-blue-500" />
            Notifications
          </CardTitle>
          <CardDescription className="text-xl ml-5 text-gray-600 dark:text-gray-400">
            Stay updated with your latest notifications and reminders.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <div className="animated-div">
            <Card className="mb-4 relative overflow-hidden rounded-lg shadow-md">
              <CardContent className="p-4 pr-12">
                <div className="flex flex-start gap-4">
                  {}
                  <div className="flex-1">
                    <h3 className="font-semibold">Welcome to Classroom.io</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      You have successfully signed up for Classroom.io. Welcome to the platform!
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="p-2 bg-slate-100 dark:bg-slate-900">
                        Message
                      </Badge>
                      <span className="time text-xs text-slate-500">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotificationsPage;
