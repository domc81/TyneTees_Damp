import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { createClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Surveyors Management',
  description: 'Manage surveyors and their assignments',
};

export default async function SurveyorsPage() {
  const supabase = createClient();
  
  // Fetch surveyors data
  const { data: surveyors, error } = await supabase
    .from('surveyors')
    .select('*');

  if (error) {
    console.error('Error fetching surveyors:', error);
    return (
      <div className="container mx-auto py-8">
        <Card variant="glass" padding="lg">
          <div className="text-2xl font-bold mb-4">Error Loading Surveyors</div>
          <div className="text-red-500">Failed to load surveyors data. Please try again later.</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Link href="/admin/team" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Team
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Surveyors Management</h1>
        <Button variant="secondary">
          <Link href="/team/surveyors/new">Add New Surveyor</Link>
        </Button>
      </div>

      <Card variant="glass" padding="lg">
        <div className="text-2xl font-bold mb-6">Surveyors List</div>
        {surveyors && surveyors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone</th>
                  <th className="text-left p-2">Qualifications</th>
                  <th className="text-left p-2">Availability</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {surveyors.map((surveyor) => (
                  <tr key={surveyor.id} className="border-b last:border-none">
                    <td className="p-2">{surveyor.full_name}</td>
                    <td className="p-2">{surveyor.email}</td>
                    <td className="p-2">{surveyor.phone || 'N/A'}</td>
                    <td className="p-2">{surveyor.qualifications || 'N/A'}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded ${surveyor.availability ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {surveyor.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Link href={`/team/surveyors/${surveyor.id}/edit`}>Edit</Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Link href={`/team/surveyors/${surveyor.id}`}>View</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No surveyors found.</p>
            <Button variant="secondary">
              <Link href="/team/surveyors/new">Add Your First Surveyor</Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}