import { Card, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import PositionPage from "../../../positions/page"
import RoutePagee from "../../../routes/page"
import SensorDataPage from "../../../sensor-data/page"
import DevicePage from "../../../device/page"

const SideTab: React.FC<{
  id: number
  isEdit: boolean
  refetch: () => void
}> = ({ id, isEdit, refetch }) => {
  return (
    <Tabs
      defaultValue="positions"
      className="h-96 w-full bg-slate-950 p-2 text-white"
    >
      <TabsList className="grid h-12 w-full grid-cols-4 bg-gray-900   text-primary mb-20 sticky top-0 z-20 p-10">
        <TabsTrigger value="positions" className="focus:bg-primary data-[state=active]:underline-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:font-bold rounded-none data-[state=active]:bg-slate-950">
          Positions
        </TabsTrigger>
        <TabsTrigger value="routes" className="focus:bg-primary data-[state=active]:underline-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:font-bold rounded-none data-[state=active]:bg-slate-950">
          Routes
        </TabsTrigger>
        <TabsTrigger value="sensors" className="focus:bg-primary data-[state=active]:underline-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:font-bold rounded-none data-[state=active]:bg-slate-950">
          Sensor Data
        </TabsTrigger>
        <TabsTrigger value="devices" className="focus:bg-primary data-[state=active]:underline-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:font-bold rounded-none data-[state=active]:bg-slate-950">
          Devices
        </TabsTrigger>
      </TabsList>
      {/* <TabsContent value="notes">
        <Card>
          <TinyMCE id={id} isLead={true} />
        </Card>
      </TabsContent> */}
      <TabsContent value="positions" className=" rounded-md">
        <PositionPage />
      </TabsContent>
      <TabsContent value="routes">
        <RoutePagee />
      </TabsContent>
      <TabsContent value="sensors">
        <SensorDataPage />
      </TabsContent>
      <TabsContent value="devices">
        <DevicePage />
      </TabsContent>
    </Tabs>
  )
}

export default SideTab
